gcloud builds submit --tag gcr.io/hackernews-275418/hackernews
gcloud run deploy --image gcr.io/hackernews-275418/helloworld --platform managed