let feedbacks = [];
let nextId = 1;

function addOne(name, comment, rating) {
    const feedback = {
        id: nextId++,
        name,
        comment,
        rating,
    };
    feedbacks.push(feedback);
    return feedback;
}

function getAll() {
    return feedbacks;
}

function findById(id) {
    return feedbacks.find((f) => f.id === id);
}

function updateById(id, updates) {
    const feedback = findById(id);
    if (!feedback) return null;

    if (updates.name !== undefined) feedback.name = updates.name;
    if (updates.comment !== undefined) feedback.comment = updates.comment;
    if (updates.rating !== undefined) feedback.rating = updates.rating;

    return feedback;
}

function deleteById(id) {
    const index = feedbacks.findIndex((f) => f.id === id);
    if (index === -1) return null;

    const deleted = feedbacks[index];
    feedbacks.splice(index, 1);
    return deleted;
}

module.exports = {
    addOne,
    getAll,
    findById,
    updateById,
    deleteById,
};
}