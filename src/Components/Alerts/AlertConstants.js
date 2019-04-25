export const alertType = {
    DELETE: 'DELETE',
    MANAGER: 'MANAGER',
    RESET: 'RESET',
    MAX: 'MAX'
};

export const ALERT_CONTENT = {
    DELETE: {
        variant: "danger",
        heading: "Oh my!",
        text: 'This boards manager has decided to reset all the shapes!\nGuess you have to start from scratch...'
    },
    MANAGER: {
        variant: "success",
        heading: "Why hello!",
        text: "You've been added as a manager for this board. This doesn't give you much...\nBut you can delete the shapes if you like, which is nice."
    },
    RESET: {
        variant: "info",
        heading: "Keep on creating!",
        text: "The daily shape count has been reset, you can now resume drawing shapes in all the boards."
    },
    MAX: {
        variant: "secondary",
        heading: "Whoops!",
        text: "You've reached the maximum shapes allowed to create per day. See you tomorrow!"
    }
};