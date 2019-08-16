FROM golang:latest
RUN go get -u golang.org/x/lint/golint
RUN go get github.com/githubnemo/CompileDaemon

WORKDIR /go/src/github.com/evenlwanvik/RESTful-home/service.config
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

CMD CompileDaemon -build="go install ." -command="/go/bin/service.config"
RUN ls



#FROM golang:latest
#RUN go get github.com/golang/dep/cmd/dep

#WORKDIR /go/src/github.com/evenlwanvik/RESTful-home
#COPY . /go/src/github.com/evenlwanvik/RESTful-home/

#RUN dep ensure
#RUN CGO_ENABLED=0 GOOS=linux go install ./service.config

#FROM alpine:latest
#WORKDIR /root/
#COPY --from=0 /go/bin/service.config .
#CMD ["./service.config"]

