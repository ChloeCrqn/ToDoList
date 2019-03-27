$(function () {

	// Affichage des tâches existantes
	getTodo();


	$("#add").click(function () {

		var message = document.getElementById("todo");

		if (message.value == '') {
			alert('message vide');
		} else {

			addTodo(message);


		}
	});

	$("body").on("click", '#delete', function () {
		var id = this.getAttribute('data-id');
		var myModalElement = document.getElementById("myModalConfirm");
		myModalElement.style.display = "block";

		var annuler = document.getElementById("annuler");
		annuler.addEventListener("click", function () {
			myModalElement.style.display = "none";
		})

		var confirm = document.getElementById("confirm");


		confirm.addEventListener("click", function () {
			removeATask(id);
			myModalElement.style.display = "none";
		});



	});


	$("body").on("click", '#update', function () {
		var id = this.getAttribute('data-id');
		getSpecifiqTask(id);


	});

	$("body").on("click", "#changeText", function () {
		var textToChangeElement = document.getElementById("textToChange");
		var saveElement = document.getElementById("changeText");

		updateSpecifiqTask(saveElement.getAttribute("data-id"), textToChangeElement.value);
	})


	$("body").on("click", "#addUserTask", function () {
		var myModalUser = document.getElementById("myModalUser");
		myModalUser.style.display = "block";
	});


	function getTodo() {
		$.ajax({
			type: "GET",
			url: "controler/get_task.php",
			dataType: "json",
			success: function (json) {
				console.log(json);
				var data = json;
				var task = document.getElementById("task");

				var dataLength = data.length;
				console.log(dataLength);

				for (var i = 0; i < dataLength; i++) {
					var firstTr = document.createElement('tr');
					firstTr.setAttribute('class', 'data');

					var firstTd = document.createElement('td');
					firstTd.innerHTML = data[i].id;

					var secondTd = document.createElement('td');
					secondTd.innerHTML = data[i].date
					var thirdTd = document.createElement('td');
					thirdTd.innerHTML = data[i].name

					var fourthTd = document.createElement("td");
					if (data[i].user == "") {
						fourthTd.innerHTML = "<center><h3> - </h3></center>"
					} else {

						fourthTd.innerHTML = data[i].user;

					}

					var fiveTd = document.createElement('td');

					fiveTd.innerHTML = "<a id='update' data-id='" + data[i].id + "''><i class='fa fa-pencil fa-2x'></i></a>"
					fiveTd.innerHTML += "<a id='delete' data-id='" + data[i].id + "'><i class='fa fa-trash-o fa-2x'></i></a>"
					fiveTd.innerHTML += "<a id='addUserTask' data-id='" + data[i].id + "'><i class='fa fa-user fa-2x'></i></a>"

					firstTr.appendChild(firstTd);
					firstTr.appendChild(secondTd);
					firstTr.appendChild(thirdTd);
					firstTr.appendChild(fourthTd);
					firstTr.appendChild(fiveTd);
					task.appendChild(firstTr);

				}




			}
		});
	}


	function addTodo(message) {
		$.ajax({
			type: "GET",
			url: "controler/add_task.php",
			data: {
				message: message.value
			},
			dataType: "json",
			success: function (json) {
				// update du tableau

				$.ajax({
					type: "GET",
					url: "controler/get_task.php",
					dataType: "json",
					success: function (json) {
						alert("Tache ajoutée");
						refreshTodo();
					}
				});



			}
		});
	}


	function refreshTodo() {
		$.ajax({
			type: "GET",
			url: "controler/get_task.php",
			dataType: "json",
			success: function (json) {
				deleteTask();

				var data = json;
				var task = document.getElementById("task");

				var dataLength = data.length;
				console.log(dataLength);

				for (var i = 0; i < dataLength; i++) {
					var firstTr = document.createElement('tr');
					firstTr.setAttribute('class', 'data');
					var firstTd = document.createElement('td');
					firstTd.innerHTML = data[i].id;

					var secondTd = document.createElement('td');
					secondTd.innerHTML = data[i].date
					var thirdTd = document.createElement('td');
					thirdTd.innerHTML = data[i].name
					var fourthTd = document.createElement("td");
					if (data[i].user == "") {
						fourthTd.innerHTML = "<center><h3> - </h3></center>"
					} else {

						fourthTd.innerHTML = data[i].user;

					}

					var fiveTd = document.createElement('td');

					fiveTd.innerHTML = "<a id='update' data-id='" + data[i].id + "''><i class='fa fa-pencil fa-2x'></i></a>"
					fiveTd.innerHTML += "<a id='delete' data-id='" + data[i].id + "'><i class='fa fa-trash-o fa-2x'></i></a>"
					fiveTd.innerHTML += "<a id='addUserTask' data-id='" + data[i].id + "'><i class='fa fa-user fa-2x'></i></a>"

					firstTr.appendChild(firstTd);
					firstTr.appendChild(secondTd);
					firstTr.appendChild(thirdTd);
					firstTr.appendChild(fourthTd);
					firstTr.appendChild(fiveTd);
					task.appendChild(firstTr);

				}

			}
		});
	}


	function deleteTask() {
		var oldTask = document.getElementsByClassName('data');
		var oldTaskLength = oldTask.length;

		for (var i = oldTask.length - 1; i >= 0; --i) {
			oldTask[i].remove();
		}
	}

	function removeATask(id) {
		$.ajax({
			type: "GET",
			url: "controler/delete_task.php",
			data: {
				id: id
			},
			dataType: "json",
			success: function (json) {
				alert("Tâche suprimé");
				refreshTodo();

			}
		});
	}

	function getSpecifiqTask(id) {
		$.ajax({
			type: "GET",
			url: "controler/get_specificTask.php",
			dataType: "json",
			data: { id: id },
			success: function (json) {
				console.log(json);
				var textToChangeElement = document.getElementById("textToChange");
				var saveElement = document.getElementById("changeText");
				textToChangeElement.value = json[0].name;
				saveElement.setAttribute("data-id", json[0].id);
				var myModalElement = document.getElementById("myModal");
				myModalElement.style.display = "block";
			}
		});
	}


	function updateSpecifiqTask(id, message) {
		$.ajax({
			type: "GET",
			url: "controler/update_specificTask.php",
			dataType: "json",
			data: {
				id: id,
				message: message
			},
			success: function (json) {
				var myModalElement = document.getElementById("myModal");
				myModalElement.style.display = "none";
				alert("Tâche mise à jour");
				refreshTodo();

			}
		});
	}



	$("body").on("click", '#gestionUser', function () {
		$.ajax({
			type: "GET",
			url: "controler/get_user.php",
			dataType: "json",
			success: function (json) {
				console.log(json);


				/* Génération du header du tableau */
				var tableElement = document.getElementById("listUser");
				tableElement.innerHTML = "";
				var trHeaderElement = document.createElement("tr");
				var firstThElement = document.createElement("th");
				firstThElement.innerHTML = "Utilisateurs"
				var secondThElement = document.createElement("th");
				secondThElement.innerHTML = "Actions"

				trHeaderElement.appendChild(firstThElement);
				trHeaderElement.appendChild(secondThElement);
				tableElement.appendChild(trHeaderElement);

				/* Fin  de génération du header  */

				for (var i = 0; i < json.length; i++) {
					console.log(json[i].nom)

					var trElement = document.createElement("tr");

					var firstTdElement = document.createElement("td");
					firstTdElement.innerHTML = json[i].nom;

					var secondTdElement = document.createElement("td");
					secondTdElement.innerHTML = '<i id="edit" data-id="' + json[i].id + '" class="fa fa-pencil fa-2x">'
					secondTdElement.innerHTML += '<i id="remove" data-id="' + json[i].id + '" class="fa fa-times fa-2x">'

					trElement.appendChild(firstTdElement);
					trElement.appendChild(secondTdElement);
					tableElement.appendChild(trElement);
				}

				$("body").on("click", "#remove", function () {
					var dataId = this.getAttribute("data-id");
					console.log(dataId);
					$.ajax({
						type: "GET",
						url: "controler/delete_user.php",
						dataType: "json",
						data: { id: dataId },
						success: function (json) {
							$.ajax({
								type: "GET",
								url: "controler/get_user.php",
								dataType: "json",
								success: function (json) {
									alert("utilisateur supprimé")

									/* Génération du header du tableau */
									var tableElement = document.getElementById("listUser");
									tableElement.innerHTML = "";
									var trHeaderElement = document.createElement("tr");
									var firstThElement = document.createElement("th");
									firstThElement.innerHTML = "Utilisateurs"
									var secondThElement = document.createElement("th");
									secondThElement.innerHTML = "Actions"

									trHeaderElement.appendChild(firstThElement);
									trHeaderElement.appendChild(secondThElement);
									tableElement.appendChild(trHeaderElement);

									/* Fin  de génération du header  */

									for (var i = 0; i < json.length; i++) {
										console.log(json[i].nom)

										var trElement = document.createElement("tr");

										var firstTdElement = document.createElement("td");
										firstTdElement.innerHTML = json[i].nom;

										var secondTdElement = document.createElement("td");
										secondTdElement.innerHTML = '<i id="edit" data-id="' + json[i].id + '" class="fa fa-pencil fa-2x">'
										secondTdElement.innerHTML += '<i id="remove" data-id="' + json[i].id + '" class="fa fa-times fa-2x">'

										trElement.appendChild(firstTdElement);
										trElement.appendChild(secondTdElement);
										tableElement.appendChild(trElement);
									}
								}

							});

						}
					});
				})


				$("body").on("click", "#edit", function () {
					var dataId = this.getAttribute("data-id");

					$.ajax({
						type: "GET",
						url: "controler/get_specific_user.php",
						dataType: "json",
						data: { id: dataId },
						success: function (json) {
							console.log(json);
							var tableElement = document.getElementById("listUser");
							tableElement.innerHTML = "";
							var inputElement = document.createElement("input");
							inputElement.setAttribute("type", "text");
							inputElement.setAttribute("id", "inputToChange");
							inputElement.value = json[0].nom;

							var buttonElement = document.createElement("button");
							buttonElement.setAttribute("data-id", json[0].id);
							buttonElement.setAttribute("id", "updateUserName");
							buttonElement.innerHTML = "Modifier";



							tableElement.appendChild(inputElement);
							tableElement.appendChild(buttonElement);

							$("body").on("click", "#updateUserName", function () {
								dataId = this.getAttribute("data-id");
								name = document.getElementById("inputToChange").value;
								$.ajax({
									type: "GET",
									url: "controler/update_specific_user.php",
									dataType: "json",
									data: { id: dataId,
										   user : name  
										  },
									success: function (json) {
										alert("utilisateurs mise à jour");
										$.ajax({
											type: "GET",
											url: "controler/get_user.php",
											dataType: "json",
											success: function (json) {
												console.log(json);


												/* Génération du header du tableau */
												var tableElement = document.getElementById("listUser");
												tableElement.innerHTML = "";
												var trHeaderElement = document.createElement("tr");
												var firstThElement = document.createElement("th");
												firstThElement.innerHTML = "Utilisateurs"
												var secondThElement = document.createElement("th");
												secondThElement.innerHTML = "Actions"

												trHeaderElement.appendChild(firstThElement);
												trHeaderElement.appendChild(secondThElement);
												tableElement.appendChild(trHeaderElement);

												/* Fin  de génération du header  */

												for (var i = 0; i < json.length; i++) {
													console.log(json[i].nom)

													var trElement = document.createElement("tr");

													var firstTdElement = document.createElement("td");
													firstTdElement.innerHTML = json[i].nom;

													var secondTdElement = document.createElement("td");
													secondTdElement.innerHTML = '<i id="edit" data-id="' + json[i].id + '" class="fa fa-pencil fa-2x">'
													secondTdElement.innerHTML += '<i id="remove" data-id="' + json[i].id + '" class="fa fa-times fa-2x">'

													trElement.appendChild(firstTdElement);
													trElement.appendChild(secondTdElement);
													tableElement.appendChild(trElement);
												}
											}
										});
									}
								});


							});

						}

					});

				})

			}
		});
	})


	$("body").on("click","#donnerTask", function(){
		$.ajax({
			type: "GET",
			url: "controler/get_user.php",
			dataType: "json",
			success: function (json) {
				console.log(json);
				var userListElement = document.getElementById("userList");
				var option = document.createElement("option");
				option.text ="";
				userListElement.add(option);

				for(var i=0; i<json.length;i++){
					var dynamicOption = document.createElement("option");
					dynamicOption.text = json[i].nom;
					dynamicOption.value = json[i].id;
					userListElement.add(dynamicOption);
				}
				var shareTask = document.getElementById("shareTask");

				shareTask.addEventListener("click",function(){
					var userList = document.getElementById("userList");
					var userId = userList.value;
					var userText = userList.options[userList.selectedIndex].text;
					$.ajax({
						type: "GET",
						url: "controler/update_specificTask.php",
						dataType:"json",
						data:{
							id:userId,
							user : userText
						},
						success:function(json){

						}
					})
				});



			}
		});
	});

});

