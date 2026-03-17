export class Tools {
    /////////////////////
    // PUBLIC FUNCTION //
    /////////////////////
    async getMethod(URL, options) {
        const response = await fetch(URL, {
            method: "GET",
            headers: options
        });
        return await response.json();
    }
}
