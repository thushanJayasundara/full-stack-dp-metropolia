const Feedback = require("./feedbackLib");

const getAllFeedbacks = (req, res) => {
    const all = Feedback.getAll();
    res.json(all);
};

const createFeedback = (req, res) => {
    const { name, comment, rating } = req.body;

    if (!name || !comment || rating === undefined) {
        return res.status(400).json({
            error: "name, comment, and rating are required",
        });
    }

    const newFeedback = Feedback.addOne(name, comment, rating);
    res.status(201).json(newFeedback);
};

const getFeedbackById = (req, res) => {
    const id = Number(req.params.feedbackId);
    const feedback = Feedback.findById(id);

    if (!feedback) {
        return res.status(404).json({ error: "Feedback not found" });
    }

    res.json(feedback);
};

const updateFeedback = (req, res) => {
    const id = Number(req.params.feedbackId);
    const updated = Feedback.updateById(id, req.body);

    if (!updated) {
        return res.status(404).json({ error: "Feedback not found" });
    }

    res.json(updated);
};

const deleteFeedback = (req, res) => {
    const id = Number(req.params.feedbackId);
    const deleted = Feedback.deleteById(id);

    if (!deleted) {
        return res.status(404).json({ error: "Feedback not found" });
    }

    res.json({ message: "Deleted", deleted });
};

module.exports = {
    getAllFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback,
};