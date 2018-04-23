(function(){
	'use strict'
	let adalabUsers = [];
	let adalaberInfo = {};
	const userSelect = document.getElementById('user-select');
	const userContainer = document.querySelector('.user-container');
	const memberSince = document.querySelector('.member-since');

	fetch('https://api.github.com/orgs/adalab/public_members?per_page=68')
		.then(function(response){
			return response.json();
		})
		.then(function(json){
			adalabUsers = json;

			for (var i = 0; i < adalabUsers.length; i++) {
				let optionUser = document.createElement('option');
				optionUser.value = adalabUsers[i].login;
				optionUser.innerHTML = adalabUsers[i].login;
				userSelect.appendChild(optionUser);
			}
		});

	userSelect.addEventListener('change', () => {
		let userName = event.target.value;
		if(userName !== 'Selecciona una usuaria') {
			fetch(`https://api.github.com/users/${userName}`)
				.then(function(response){
					return response.json();
                })
                .then(function(json){
					adalaberInfo = json;

				renderUserInfo(adalaberInfo);
			})
		} else {
			location.reload();
		}
	});

	function renderUserInfo(adalaberInfo) {
		let imgLocation = '<img class="location" src="images/location.svg" alt="location">';

		if(adalaberInfo.location === null) {
			adalaberInfo.location = '';
			imgLocation = '';
		}
		if(adalaberInfo.name === null) {
			adalaberInfo.name = '';
		}
        userContainer.innerHTML = `
        <img class="adalaber-avatar" src=https://avatars1.githubusercontent.com/u/${adalaberInfo.id} alt="adalaber avatar">
        <div class="adalaber-info">
            <p class="adalaber-username">@${adalaberInfo.login}</p>
            <h2 class="adalaber-name">${adalaberInfo.name}</h2>
            <div class="location-container">
                ${imgLocation}
                <p class="adalaber-location">${adalaberInfo.location}</p>
            </div>
        </div>
        <div class="social-container">
            <div>
                <h2 class="social-title">${adalaberInfo.public_repos}</h2>
                <p class="social-paragraph">Repos</p>
            </div>
            <div>
                <h2 class="social-title">${adalaberInfo.followers}</h2>
                <p class="social-paragraph">Followers</p>
            </div>
            <div>
                <h2 class="social-title">${adalaberInfo.following}</h2>
                <p class="social-paragraph">Following</p>
            </div>
        </div>`;
    memberSince.innerHTML = `Miembro desde ${new Date(adalaberInfo.created_at).getFullYear()}`;
};
})()