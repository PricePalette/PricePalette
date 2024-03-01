## Deployment steps

1. Login via azure CLI: `az acr login --name pricepaletteimages`
2. Build docker image: `docker build -t pricepalette-img .`
3. Tag image: `docker tag pricepalette-img:latest pricepaletteimages.azurecr.io/pricepaletteimages`
4. Push image to ACR: `docker push pricepaletteimages.azurecr.io/pricepaletteimages`