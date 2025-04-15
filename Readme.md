# 6.1P Kubernetes Deployment

This task demonstrates the process of deploying a **containerized Node.js application** to a **Kubernetes cluster**. The application is packaged using Docker, deployed using Kubernetes manifests (Deployment & Service), and exposed for external access.

## Tools & Technologies Used

- **Node.js** - Application runtime
- **Docker** - Containerization tool
- **Kubernetes** - Container orchestration
- **Git & GitHub** - Source control and collaboration

## Inside `Dockerfile`

```
FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY server.js .
EXPOSE 8080
CMD [ "node", "server.js" ]
```

After that we create `docker-compose.yml` file.

## Build the docker file

Docker build command.

```
docker build -t sit737-2025-prac5p-app .
```

## Docker compose

```
docker compose up
```

## Push the image to docker registry

```
docker push [username]/sit737-2025-prac5p-app:latest
```

## Deploy the dashboard UI

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboar d/v2.7.0/aio/deploy/recommended.yaml
```

## Create a user

```dashboard-adminuser.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
```

```
kubectl apply -f dashboard-adminuser.yaml
```

```cluster_role_binding.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```

```
kubectl apply -f cluster_role_binding.yaml
```

## Login to dashboard

generate token to login
```
kubectl -n kubernetes-dashboard create token admin-user
```
start dashboard
```
kubectl proxy
```

```
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/login
```

## Create pods

```
apiVersion: v1
kind: Pod
metadata:
  name: mypod
  labels:
    app: mypod
spec:
  containers:
    - name: nodewebapp
      image: slimpotatoboy/sit737-2025-prac5p-app:latest
      ports:
        - containerPort: 8080
  dnsPolicy: ClusterFirst
  restartPolicy: Always
```

## Create Replica Sets

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myreplicaset
  labels:
    app: mypod
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
        - name: nodewebapp
          image: slimpotatoboy/sit737-2025-prac5p-app:latest
          ports:
            - containerPort: 8080
```
## Create deployment
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mydeployment
  labels:
    app: mypod
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
        - name: nodewebapp
          image: slimpotatoboy/sit737-2025-prac5p-app:latest
          ports:
            - containerPort: 8080
```
