const saveToLocalStorage = <T>(keyName: string, value: T): void => {
  if (!keyName) {
    throw new Error("Key name is required.");
  }
  if (value === null || value === undefined) {
    throw new Error("Value cannot be null or undefined.");
  }
  localStorage.setItem(keyName, JSON.stringify(value));
};

const retrieveFromLocalStorage = <T>(keyName: string): T | null => {
  const data = localStorage.getItem(keyName);
  return data ? (JSON.parse(data) as T) : null;
};

const fetchJsonDataFromApi = async <T>(endpoint: string): Promise<T | null> => {
  if (!endpoint) return null;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Failed to fetch data from API: ${error}`);
    throw error;
  }
};

export { saveToLocalStorage, retrieveFromLocalStorage, fetchJsonDataFromApi };
