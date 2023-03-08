function loadUsersList(typeOfUser, pageNumber, pageSize) {
    fetch(
        `http://94.103.87.164:8081/api/v1/${typeOfUser}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        }
    )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            $(".users-container").empty();
            $("#applications-container").empty();

            let template = $("#users-list-template");

            for (let user of json.content) {
                let block = template.clone();
                block.removeClass("d-none");
                switch (typeOfUser) {
                    case "students":
                        block.attr("id", "user-" + user.userInfo.id);
                        block
                            .find(".users-list-name")
                            .text(user.userInfo.surname + " " + user.userInfo.name + " " + user.userInfo.patronymic);
                        block.find(".users-list-document-number").text(user.studentNumber);
                        block.find(".users-list-role").text(user.userInfo.accountStatus);
                        break;
                    case "employees":
                        block.attr("id", "user-" + user.userInfo.id);
                        block
                            .find(".users-list-name")
                            .text(user.userInfo.surname + " " + user.userInfo.name + " " + user.userInfo.patronymic);
                        block.find(".users-list-document-number").text(user.contractNumber);
                        block.find(".users-list-role").text(user.userInfo.accountStatus);
                        break;
                    case "users":
                        block.attr("id", "user-" + user.id);
                        block
                            .find(".users-list-name")
                            .text(user.surname + " " + user.name + " " + user.patronymic);
                        block.find(".users-list-role").text(user.accountStatus);
                        break;
                    default:
                        break;
                }
                $("#users-container").append(block);
            }
        });
}
export default loadUsersList;
