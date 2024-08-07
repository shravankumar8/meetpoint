# Gmeet_clone
# Quick Setup Locally
methods to setups the project
1.via docker
2.raw setup

# raw setup

```
docker compose watch
```

    OR

> Install the Dependencies

```
cd daily-code
yarn install
```

> Setup DB 

For Mac and Linux users
```
cd packages/db
chmod +x ./setupDB.sh
./setupDB.sh
```

For Windows users
```
cd packages/db
yarn prisma migrate dev
yarn prisma db seed
```

> Run locally

```
cd ../..
yarn run dev
```



http://meetpointapi.yourshravan.tech/ this doman serves the backend port which usually serves 3000
http://meetpointapi.yourshravan.tech/max



http://sockets.yourshravan.tech 
http://sockets.yourshravan.tech/max
