const headers = { 'Content-Type': 'application/json' }

// get all saved cases
export const getAllCases = async () => {
  const response = await fetch('/api/cases')
  return response.json()
}

// get one case
export const getCase = async (id) => {
  const response = await fetch(`/api/cases/${id}`)
  return response.json()
}

// save new case
export const createCase = async (caseData) => {
  const response = await fetch('/api/cases', {
    method: 'POST',
    headers,
    body: JSON.stringify(caseData)
  })
  return response.json()
}

// update case
export const updateCase = async (id, caseData) => {
  const response = await fetch(`/api/cases/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(caseData)
  })
  return response.json()
}

// delete case
export const deleteCase = async (id) => {
  const response = await fetch(`/api/cases/${id}`, {
    method: 'DELETE'
  })
  return response.json()
}