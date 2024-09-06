import { ref } from "vue";
import { useErrors } from "@/composables/useErrors";
import type {
	Expense,
	NewExpense,
	ExpenseWithDetails,
	Group,
	UserGroupRole,
	ExpenseSplit,
	ExpenseResponse,
	GroupResponse,
} from "@/types";
import { createClient } from "@supabase/supabase-js";

const supabase = ref();

// In your types file (e.g., @/types/index.ts)
export const useSupabase = () => {
	const expenses = ref<ExpenseWithDetails[]>([]);
	const groups = ref<Group[]>([]);
	const errors = useErrors();

	const init = () => {
		const apiKey = import.meta.env.VITE_SUPABASE_API_KEY;
		if (!apiKey) {
			throw new Error("SUPABASE_API_KEY is not defined");
		}
		supabase.value = createClient(
			"https://hgugshdprcthbctifilw.supabase.co",
			apiKey
		);
	};

	const getExpenses = async (groupId: string): Promise<ExpenseWithDetails[] | undefined> => {
		try {
			const { data, error } = await supabase.value.from("expenses").select(`
					id,
					group_id,
					description,
					amount,
					time,
					paid_by,
					expense_types (id, value, label, icon),
					currencies (code, name, symbol),
					users (id, name, email)
				`).eq('group_id', groupId);
			if (error) throw error;

			const expensesWithSplits = await Promise.all(
				data.map(async (expense: ExpenseResponse) => {
					const { data: splits, error: splitsError } = await supabase.value
						.from("expense_splits")
						.select("*")
						.eq("expense_id", expense.id);

					if (splitsError) throw splitsError;

					return {
						...expense,
						expenseType: expense.expense_types,
						currency: expense.currencies,
						paidBy: expense.users,
						splits: splits,
					};
				})
			);
			expenses.value = expensesWithSplits;
			return expensesWithSplits;
		} catch (error) {
			errors.showError(
				"Error fetching expenses",
				errors.getErrorMessage(error)
			);
		}
	};

	const addExpense = async (expense: NewExpense): Promise<Expense> => {
		try {
			const expenseDbFormat = {
				group_id: "2bddf2e7-bd74-4128-85ad-e911c477113c",
				description: expense.description,
				expense_type_id: "ab50a324-105c-41bf-b629-274af7d8e734",
				currency_code: "7a844bc4-15a3-4749-afcd-fe8e248db044",
				amount: expense.amount,
				time: expense.time,
				paid_by: "a6aee271-0cf7-4f0f-adcb-1bbfb1fe9618",
			};
			const { data, error } = await supabase.value
				.from("expenses")
				.insert(expenseDbFormat)
				.select()
				.single();

			if (error) throw error;
			return data;
		} catch (error) {
			console.error("Error adding expense:", error);
			throw error; // Re-throww the error to be handled by the caller
		}
	};

	const getGroups = async (): Promise<GroupResponse[] | undefined> => {
		try {
			const { data, error } = await supabase.value.from("groups").select("*");

			if (error) throw error;

			groups.value = data;
			return data;
		} catch (error) {
			errors.showError("Error fetching groups", errors.getErrorMessage(error));
		}
	};

	const getUserGroupRoles = async (
		userId: string
	): Promise<UserGroupRole[] | undefined> => {
		try {
			const { data, error } = await supabase.value
				.from("user_group_roles")
				.select("*")
				.eq("user_id", userId);

			if (error) throw error;

			return data;
		} catch (error) {
			errors.showError(
				"Error fetching user group roles",
				errors.getErrorMessage(error)
			);
		}
	};

	const addExpenseSplit = async (split: ExpenseSplit): Promise<void> => {
		try {
			const { error } = await supabase.value
				.from("expense_splits")
				.insert(split);

			if (error) throw error;
		} catch (error) {
			errors.showError(
				"Error adding expense split",
				errors.getErrorMessage(error)
			);
		}
	};

	const createGroup = async (
		group: Omit<Group, "id">,
		creatorUserId: string
	): Promise<Group | undefined> => {
		try {
			// Insert the new group
			const { data: groupData, error: groupError } = await supabase.value
				.from("groups")
				.insert(group)
				.select()
				.single();

			if (groupError) throw groupError;

			// Add the creator as an admin of the group
			const { error: roleError } = await supabase.value
				.from("user_group_roles")
				.insert({
					user_id: creatorUserId,
					group_id: groupData.id,
					role: "admin",
					balance: 0,
				});

			if (roleError) throw roleError;

			// Update local groups state
			groups.value.push(groupData);

			return groupData;
		} catch (error) {
			errors.showError("Error creating group", errors.getErrorMessage(error));
		}
	};

	return {
		init,
		getExpenses,
		addExpense,
		getGroups,
		getUserGroupRoles,
		addExpenseSplit,
		createGroup,
	};
};
