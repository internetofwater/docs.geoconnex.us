import json
import functions_framework
import flask
import jinja2

def to_json(dict_: dict, pretty: bool = False) -> str:
    """Mimics the to_json filter in pygeoapi"""
    return json.dumps(dict_, indent=4 if pretty else None, separators=(',', ':'))

@functions_framework.http
def templating(request: flask.Request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`.
    """
    # Allow CORS headers
    headers = {
        "Access-Control-Allow-Origin": "*",  # Allow all origins
        "Access-Control-Allow-Methods": "POST",  # Allow POST method
        "Access-Control-Allow-Headers": "Content-Type, Cache-Control",
    }

    def make_response_with_cors(content, status_code=200):
        response = flask.make_response(content, status_code)
        for header, value in headers.items():
            response.headers[header] = value
        return response

    # Handle preflight requests (CORS)
    if request.method == 'OPTIONS':
        return make_response_with_cors("", 204)

    request_json = request.get_json(silent=True)

    if not request_json:
        return make_response_with_cors("Missing json body", 400)
    # Template represents the jinja template
    if "template" not in request_json:
        return make_response_with_cors("Missing 'template' key", 400)
    # Source values represents the data to be inserted into the template
    if "source_values" not in request_json:
        return make_response_with_cors("Missing 'source_values' key", 400)

    data, template_str = request_json["source_values"], request_json["template"]
    try:
        env = jinja2.Environment()
        env.filters['to_json'] = to_json
        template = env.from_string(template_str)
        rendered_template = template.render(data)
    except jinja2.TemplateError as e:
        print(e)
        return make_response_with_cors(str(e), 400)
    
    return make_response_with_cors(rendered_template)
