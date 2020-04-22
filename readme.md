# manga-manager

## docker build

```
$ docker build -t manga-manager .
```

## push to repo (gcp)

```
$ docker tag manga-manager gcr.io/nttcom-td-us-51479829/komasshu/manga-manager:[tag]
$ docker push gcr.io/nttcom-td-us-51479829/komasshu/manga-manager
```

## deploy on k8s

```
$ gcloud compute addresses create manga-manager --global
$ kubectx gke_nttcom-td-us-51479829_asia-northeast1-b_dev-cluster
$ kubens manga-manager
$ cd k8s-files
$ kubectl apply -f server.yml
$ kubectl apply -f cert.yml
$ kubectl apply -f ingress.yml
```

please make sure to setup cloud dns ( manga-manager.m-pipe.net )

### check setting

```
$ gcloud compute addresses describe manga-manager --global
$ kubectl get ingress
$ kubectl describe managedcertificates
```

## test with docker-compose

```
$ docker-compose up
```

## appendix

### how to deploy managed certificates

https://cloud.google.com/kubernetes-engine/docs/how-to/managed-certs?hl=ja

