const url = "https://jsramverk-editor-sisl19.azurewebsites.net/docs";

export async function create(title: string) {
    let input = JSON.stringify({
        title: title,
        text: "",
    });

    return await fetch(`${url}/create`, {
        method: "POST",
        body: input,
        headers: {
            "content-type": "application/json",
        },
    })
    .then((data) => data.json())
    .then(function (data) {
        localStorage.setItem("id", data.data._id);
    })
    .catch((error) => {
        console.log(error);
        return "";
    });
}

export async function readAll() {
    return await fetch(`${url}`)
    .then((data) => data.json())
    .then((data) => {
        localStorage.setItem("all", JSON.stringify(data.data.msg));
    })
    .catch((error) => {
        console.log(error);
        return "";
    });
}

export async function read(id: any) {
    return await fetch(`${url}/${id}`)
    .then((data) => data.json())
    .then((data) => {
        localStorage.setItem("id", data.data._id);
        localStorage.setItem("text", data.data.text);
        localStorage.setItem("title", data.data.title);
    })
    .catch((error) => {
        console.log(error);
        return "";
    });
}

export async function update(id: any, title: string, text: string) {
    let input = JSON.stringify({
        id: id,
        title: title,
        text: text,
    });
    return await fetch(`${url}/update`, {
        method: "PUT",
        body: input,
        headers: {
            "content-type": "application/json",
        },
    })
    .then((data) => data.json())
    .catch((error) => {
        console.log(error);
        return "";
    });
}
