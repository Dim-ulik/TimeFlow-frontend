function deleteApplication(id) { 
    $(`#application-${id}`).remove();
}

export default deleteApplication