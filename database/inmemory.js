// Dummy data stored in memory
const users = [
    { id: 1, name: "Ayush", role: "Backend Developer" },
    { id: 2, name: "Alex", role: "Frontend Developer" }
];

export function getUsers(req, res) {
    res.json(users);
}