export async function getSongs() {
  const response = await fetch("http://localhost:3000/songs");
  return await response.json();
}
