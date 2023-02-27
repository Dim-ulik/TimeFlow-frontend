
$('#apply_filters').click(function (e) { 
    e.preventDefault();
    let formData = new FormData(filters)

    getTeachers(formData.get('sorting'), formData.get('status'))

});

function getTeachers(sorting, status) {
    fetch('http://94.103.87.164:8081/api/v1/teacher')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
    })
}