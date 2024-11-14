export async function getQuestions() {
  const res = await fetch('http://localhost:8000/questions')
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  const data = await res.json()
  return data
}
