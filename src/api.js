
const BASE_URL = "https://6afec82d3a0e70bc8d53f38c.mockapi.io";

export async function request(path, options = {}) {
    const response = await fetch(BASE_URL + path, {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    });

    if (!response.ok) {
        throw new Error("Erreur API : " + response.status);
    }

    return response.json();
}

export function getContents() {
    return request("/contents");
}

export function createContent(data) {
    return request("/contents", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export function updateContent(id, data) {
    return request("/contents/" + id, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export function deleteContent(id) {
    return request("/contents/" + id, {
        method: "DELETE"
    });
}

export function getComments() {
    return request("/comments");
}

export function createComment(data) {
    return request("/comments", {
        method: "POST",
        body: JSON.stringify(data)
    });
}
