// tourHandlers.js
const Tour = require("./tourLib");

const getAllTours = (req, res) => {
    res.json(Tour.getAll());
};

const createTour = (req, res) => {
    const { name, info, image, price } = req.body;

    if (!name || !info || !image || price === undefined) {
        return res.status(400).json({
            error: "name, info, image and price are required",
        });
    }

    const newTour = Tour.addOne(name, info, image, price);
    res.status(201).json(newTour);
};

const getTourById = (req, res) => {
    const id = Number(req.params.tourId);
    const tour = Tour.findById(id);

    if (!tour) return res.status(404).json({ error: "Tour not found" });

    res.json(tour);
};

const updateTour = (req, res) => {
    const id = Number(req.params.tourId);
    const updated = Tour.updateById(id, req.body);

    if (!updated) return res.status(404).json({ error: "Tour not found" });

    res.json(updated);
};

const deleteTour = (req, res) => {
    const id = Number(req.params.tourId);
    const deleted = Tour.deleteById(id);

    if (!deleted) return res.status(404).json({ error: "Tour not found" });

    res.json({ message: "Deleted", deleted });
};

module.exports = {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
};