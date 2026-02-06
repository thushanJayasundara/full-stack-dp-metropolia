let tours = [];
let nextId = 1;

function addOne(name, info, image, price) {
    const tour = {
        id: nextId++,
        name,
        info,
        image,
        price,
    };

    tours.push(tour);
    return tour;
}

function getAll() {
    return tours;
}

function findById(id) {
    return tours.find((t) => t.id === id);
}

function updateById(id, updates) {
    const tour = findById(id);
    if (!tour) return null;

    if (updates.name !== undefined) tour.name = updates.name;
    if (updates.info !== undefined) tour.info = updates.info;
    if (updates.image !== undefined) tour.image = updates.image;
    if (updates.price !== undefined) tour.price = updates.price;

    return tour;
}

function deleteById(id) {
    const index = tours.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const deleted = tours[index];
    tours.splice(index, 1);
    return deleted;
}

module.exports = {
    addOne,
    getAll,
    findById,
    updateById,
    deleteById,
};

if (require.main === module) {
    let result = addOne(
        "7 Days Tour",
        "Join us for the Best of Helsinki!",
        "https://www.course-api.com/images/tours/tour-1.jpeg",
        "1995"
    );

    console.log(result);
    console.log("getAll called:", getAll());
    console.log("findById called:", findById(1));
}