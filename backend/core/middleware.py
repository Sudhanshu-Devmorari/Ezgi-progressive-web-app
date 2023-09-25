class ActiveUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if the user is authenticated and active
        if request.user.is_authenticated and not request.user.is_active:
            # If the user is not active, log them out and return a forbidden response
            logout(request)
            return HttpResponseForbidden("Your account is not active.")
        
        # If the user is active or not authenticated, continue with the request
        response = self.get_response(request)
        return response
