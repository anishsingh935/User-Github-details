Please add token in backend file to run the project.
Path to add token:- backend->serverless.yml-> line no 23 [  GITHUB_ACCESS_TOKEN: 'Bearer <your access_token>' ]


To get a GitHub access token, you can follow these steps:

- Log in to your GitHub account.
- Go to the GitHub Developer Settings page (https://github.com/settings/developers)
- Click on "Generate new token" button.
- Enter a name for your token.
- Click on "Generate token" button to create the token.
- Make sure to save the token somewhere safe, as it will not be shown again after you leave the page.


You can also create token via API by sending a POST request to the following url: https://github.com/login/oauth/access_token
You will need to include client_id and client_secret in the request header or body.
