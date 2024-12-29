// api.ts

// Fetch all questions
export const fetchQuestions = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/v1/questions/get");
    if (!res.ok) {
      throw new Error("Failed to fetch questions");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

// Create a new test series
export const createTestSeries = async (testData: any) => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/previous-year-papers/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error creating test series");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating test series:", error);
    throw error;
  }
};

// Fetch all tests
export async function fetchTests() {
  try {
    const response = await fetch("http://localhost:4000/api/v1/previous-year-papers/get");  // Replace with the correct API endpoint

    if (!response.ok) {
      throw new Error("Failed to fetch tests");
    }

    const data = await response.json();
    console.log(data); // Debugging log to see the full response structure
    return data; // Return the full response, including the 'data' property
  } catch (error) {
    console.error("Error fetching tests:", error);
    throw error;
  }
}

// Fetch details for a single test by ID
export const fetchTestDetails = async (id: string) => {
  try {
    console.log("Test id url: " , `http://localhost:4000/api/v1/previous-year-papers/get/${id}`);
    const response = await fetch(`http://localhost:4000/api/v1/previous-year-papers/get/${id}`);  // Replace with correct API endpoint

    if (!response.ok) {
      throw new Error("Failed to fetch test details");
    }

    const data = await response.json();
    return data; // Return the test details
  } catch (error) {
    console.error("Error fetching test details:", error);
    throw error;
  }
}
