export let isAdmin = false; // Example user role, replace with actual logic
export let isManager = false; // Example user role, replace with actual logic
export const isUser = true; // Example user role, replace with actual logic

const userRole = sessionStorage.getItem("mongoUserRole");
console.log(userRole);
