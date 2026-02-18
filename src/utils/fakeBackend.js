export function initFakeDB() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem(
      "users",
      JSON.stringify([
        { id: 1, email: "test@test.com", password: "1234" },
        { id: 2, email: "admin@gmail.com", password: "admin123" },
      ]),
    );
  }

  if (!localStorage.getItem("purchases")) {
    localStorage.setItem(
      "purchases",
      JSON.stringify([
        { id: 1, userId: 1, gameId: 8, installed: false },
        { id: 2, userId: 1, gameId: 3, installed: true },
      ]),
    );
  }
}
