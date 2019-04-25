/**
 * Returns relevant data to save in db,
 * In order to reduce overhead of saving irrelevant data for different shapes
 * @param {object} data
 * @returns {object} result
 */
export const getShapeData = data => {
    const result = {
        shape: data.shape,
        x: data.x,
        y: data.y,
        color: data.color,
        board_id: data.board_id,
        shouldAddBoard: data.shouldAddBoard
    };
    switch (data.shape) {
        case "TRIANGLE":
        case "CIRCLE":
            result.radius = data.radius;
            break;
        case "RECT":
            result.width = data.width;
            result.height = data.height;
            break;
        case "TEXT":
            result.text = data.text;
            break;
        default:
    }
    return result;
};