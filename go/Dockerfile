FROM golang as builder

COPY fcgo.go .
RUN go build fcgo.go
RUN chmod a+x /go

FROM scratch
COPY --from=builder /go /
CMD ["/fcgo"]