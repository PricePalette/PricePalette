## Deployment steps (website)
1. Cd into repository: `cd frontend-v2/`
2. Login via azure CLI: `az acr login --name pricepaletteimages`
3. Build docker image: `docker build -t pricepalette-frontend-img .`
4. Tag image: `docker tag pricepalette-frontend-img:latest pricepaletteimages.azurecr.io/pricepalette-frontend-img`
5. Push image to ACR: `docker push pricepaletteimages.azurecr.io/pricepalette-frontend-img`


## Deployment steps (API)
1. Login via azure CLI: `az acr login --name pricepaletteimages`
2. Build docker image: `docker build -t pricepalette-backend-img .`
3. Tag image: `docker tag pricepalette-backend-img:latest pricepaletteimages.azurecr.io/pricepalette-backend-img`
4. Push image to ACR: `docker push pricepaletteimages.azurecr.io/pricepalette-backend-img`
