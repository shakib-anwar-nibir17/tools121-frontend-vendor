export async function fetchMediaData(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_MEDIA_API_URL}/contentdata/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is OK
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
