export function useErrors() {
    const isError = ref(true)
    const errorTitle = ref('Something Went Wrong')
    const errorDescription = ref('Please try again!')

    const triggerRef = ref<HTMLElement | null>(null)

    function open() {
        triggerRef.value?.click()
    }

    const showError = (title: string, description: string = ''): void => {
        isError.value = true
        errorTitle.value = title
        errorDescription.value = description
    }

    function getErrorMessage(error: unknown): string {
        if (error instanceof Error) return error.message;
        return String(error);
    }

    const closeError = () => {
        isError.value = false
        errorTitle.value = ''
        errorDescription.value = ''
        open()
    }

    return {
        showError,
        triggerRef,
        isError,
        errorTitle,
        errorDescription,
        closeError,
        open,
        getErrorMessage,
    }
}