Files included:
- index.html
- styles.css
- script.js
- Dockerfile
- nginx.conf
- docker-compose.yml
- .dockerignore

Run on Kali Linux:
1. cd pi5-docker-site
2. docker compose up --build -d
3. Open: http://localhost:8080

If Docker Compose is unavailable, use:
1. docker build -t portfolio-site .
2. docker run -d --name portfolio-site -p 8080:80 portfolio-site
