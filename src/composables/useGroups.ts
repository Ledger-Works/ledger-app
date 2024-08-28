import { ref, computed } from 'vue';
import type { Group, UserGroupRole } from '@/types';
import { useSupabase } from '@/composables/useSupabase';
import { useErrors } from '@/composables/useErrors';

export function useGroups() {
    const groups = ref<Group[]>([]);
    const currentGroup = ref<Group | null>(null);
    const userGroupRoles = ref<UserGroupRole[]>([]);
    const supabase = useSupabase();
    const errors = useErrors();

    const fetchGroups = async () => {
        try {
            groups.value = await supabase.getGroups() || [];
        } catch (error) {
            errors.showError('Failed to fetch groups', errors.getErrorMessage(error));
        }
    };

    const createGroup = async (name: string, description: string, creatorUserId: string) => {
        try {
            const newGroup = await supabase.createGroup({ name, description }, creatorUserId);
            if (newGroup) {
                groups.value.push(newGroup);
                return newGroup;
            }
        } catch (error) {
            errors.showError('Failed to create group', errors.getErrorMessage(error));
        }
    };

    const setCurrentGroup = (groupId: string) => {
        currentGroup.value = groups.value.find(group => group.id === groupId) || null;
    };

    const fetchUserGroupRoles = async (userId: string) => {
        try {
            userGroupRoles.value = await supabase.getUserGroupRoles(userId) || [];
        } catch (error) {
            errors.showError('Failed to fetch user group roles', errors.getErrorMessage(error));
        }
    };

    const listGroups = computed(() => groups.value);
    const listUserGroupRoles = computed(() => userGroupRoles.value);

    return {
        fetchGroups,
        createGroup,
        setCurrentGroup,
        currentGroup,
        fetchUserGroupRoles,
        listGroups,
        listUserGroupRoles
    };
}