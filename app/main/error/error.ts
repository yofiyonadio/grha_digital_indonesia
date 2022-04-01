export enum Code {
    BadRequest = 400, // The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
    Unauthorized = 401, // Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
    PaymentRequired = 402, // This response code is reserved for future use. The initial aim for creating this code was using it for digital payment systems, however this status code is used very rarely and no standard convention exists.
    Forbidden = 403, // The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
    NotFound = 404, // The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.
    RequestTimeout = 408, // This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.
    InternalServer = 500, // The server has encountered a situation it does not know how to handle.
    NotImplemented = 501, // The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
    BadGateway = 502 // This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
}

export enum Type {
    BadRequest = 'Bad Request',
    Unauthorized = 'Unauthorized',
    PaymentRequired = 'Payment Required',
    Forbidden = 'Forbidden',
    NotFound = 'Not Found',
    RequestTimeout = 'Request Timeout',
    InternalServer = 'Internal Server Error',
    NotImplemented = 'Not Implemented',
    BadGateway = 'Bad Gateway'
}

class ErrorModel {
    protected data: {
        type: Type | Code,
        error: string
    }

    constructor(data: {
        type: Type | Code,
        error: string
    }) {
        this.data = data
    }
}

export default ErrorModel