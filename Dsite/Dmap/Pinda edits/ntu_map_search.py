# from urllib.request import  *
# import urllib3

import requests
from requests.utils import quote
import re
import googlemaps
from datetime import datetime

gmaps = googlemaps.Client(key="AIzaSyAWobQQSUfzzBNhMCALwc3txe1US7F_QQo")

def get_listed_instructions(url):
    instruction_list = []
    url_script = requests.get(url).text
    print(url_script)
    index = 0
    while "<li>" in url_script:

        url_script = crop_text(url_script,"<li>")
        # print(url_script)
        instruction = crop_text(url_script,"<div class=\"r\">","</div")
        # print("instructions are:")
        # print(instruction)
        instruction_list.append(instruction)
    print(instruction_list)


def get_map_coordinates(location_url):
    url_script = requests.get(location_url).text
    # print(url_script)

    first_route_gothere_img = crop_text(url_script, "gothere.sg", "width")
    # print("crop_text_output:")
    # print(first_route_gothere_img)
    p = re.compile("[0-9]{1,3}[.][0-9]{3,11}")
    _locations = p.findall(first_route_gothere_img)
    # print(_locations)
    return _locations


def loc_to_url(start, end):
    url = "http://maps.ntu.edu.sg/" + "m?q=" + end + "&sch_btn=Go&font=+m&f=+" + start
    # url = "http://maps.ntu.edu.sg/m?q=" + start + "to" + end + "&d=w&fs=m"
    return url


# def nearest_bustop(location):
#     search_url = "http://maps.ntu.edu.sg/" + "m?q=" + location
#     print("nearest bus stop")
#     print(search_url)
#
#     search_url_script = requests.get(search_url).text
#     cropped_url_script = crop_text(search_url_script, "accesskey", "accesskey")
#     cropped_url_script = crop_text(cropped_url_script, "href=\"", "\">")
#     location_url = "http://maps.ntu.edu.sg" + cropped_url_script.replace(" ","%20")
#     location_url_script = requests.get(location_url).text
#     cropped_location_script = crop_text(location_url_script, "a href", "legend","backwards")
#
#
#
#     print("cropped url")
#     print(cropped_url_script)
#     print("http://maps.ntu.edu.sg" + cropped_url_script)
#     print(location_url)
#     print(cropped_location_script)

def check_in_school(location):
    url = "http://maps.ntu.edu.sg/" + "m?q=" + location
    # print("in school data")
    # print(url)
    checkInShool = requests.get(url).text

    p = re.compile("Oops, we are unable to find")
    tester = p.findall(checkInShool)
    if len(tester) == 0:
        # print("it is in school")
        return (True)
    else:
        # print("it is not in school")
        return (False)


def search(start, end, mode="w"):
    is_start_in_school = check_in_school(quote(start))
    is_end_in_school = check_in_school(quote(end))
    if is_start_in_school and is_end_in_school:
        return school_school_search(start, end, mode)
    elif not is_start_in_school and is_end_in_school:
        return outside_school_search(start, end, mode)


def convert_search_to_location(search_url):
    # print(search_url)
    search_url_script = requests.get(search_url).text
    # print(search_url_script)
    if "gothere" in search_url_script:
        return search_url
    else:
        cropped_url_script = crop_text(search_url_script, "accesskey", "accesskey")
        cropped_url_script = crop_text(cropped_url_script, "href=\"", "\">")
        location_url = "http://maps.ntu.edu.sg" + cropped_url_script.replace(" ", "%20")
        return location_url


def outside_school_search(start, end, mode="w"):
    search_url = "http://maps.ntu.edu.sg/" + "m?q=" + end
    end_location_url = convert_search_to_location(search_url)
    end_locations = get_map_coordinates(end_location_url)

    # print("outside to in school search:")
    # print(end_locations)
    now = datetime.now()

    bob = end_locations[0] + ", " + end_locations[1]
    # print(type(bob))
    # print(bob)
    directions_result = gmaps.directions(start,
                                         bob,
                                         mode="transit",
                                         departure_time=now)
    directions_result = str(directions_result)

    best_bus_stop = crop_text_backwards(directions_result, "arrival_stop", "arrival_time")
    # print(best_bus_stop)
    best_bus_stop = crop_text(best_bus_stop, "'name':", "}")
    best_bus_stop = crop_text(best_bus_stop, "'", "'")

    # print("GOOGLE MAP DIRECTIONS_________________")
    # print(directions_result)
    # print("NEAREST BUST STOP IS:____________________________")
    # print(best_bus_stop)

    next_partial_result = search(best_bus_stop, end, mode)

    p = re.compile("[0-9]{1,3}[.][0-9]{3,11}")
    google_extracted = p.findall(directions_result)
    # print("extracted from google")
    # print(google_extracted)

    # print(end_locations[0])

    # get nearest bus stop
    # googlemaps from outside to nearest bus stop
    # school_school_search(bus_stop, end)
    return google_extracted,next_partial_result


def school_school_search(start, end, mode="please"):
    start = quote(start)
    end = quote(end)
    # print("school - school search")
    locations = []
    search_url = loc_to_url(start, end)
    # print(search_url)
    search_url_script = requests.get(search_url).text
    cropped_search_url_script = crop_text(search_url_script, "locf dir", "focal pad")
    cropped_search_url_script = crop_text(cropped_search_url_script, "m?q=", "&fs")
    from_text = cropped_search_url_script
    cropped_search_url_script = crop_text(search_url_script, "locf dir")
    cropped_search_url_script = crop_text(cropped_search_url_script, "locf dir", "focal pad")
    cropped_search_url_script = crop_text(cropped_search_url_script, "m?q=", "&fs")
    to_text = cropped_search_url_script
    # print("TRYING TO GE A BETTER URL")
    # print(search_url)

    # print(from_text)
    # print(cropped_search_url_script)
    # print(mode)
    #mode = "fuck you"
    better_url = "http://maps.ntu.edu.sg/m?q=" + from_text.replace(" ", "%20") + "%20to%20" + to_text.replace(" ", \
                                                                                                              "%20") + "&d=" + mode + "&fs=m"
    # print("better url is:")
    # print(better_url)

    # print("cropped text out")
    # print(cropped_search_url_script)
    # p = re.compile("")
    # tester = p.findall(search_url_script)
    # print(tester)

    # result_url = "http://maps.ntu.edu.sg/m?q=School%20of%20Biological%20Sciences%20(SBS)%20to%20Nanyang%20Executive%20Centre%20(NEC)&d=w&fs=m"
    result_url = "http://maps.ntu.edu.sg/m?q=Hall%20of%20Residence%202%20(Hall%202)%20to%20Nanyang%20Executive%20Centre%20(NEC)&d=d&fs=m"
    overall_route_response = requests.get(better_url)
    # print(overall_route_response.text)
    start_of_first_route = crop_text(overall_route_response.text, 'id=d ')

    # print(start_of_first_route)

    first_route_url = crop_text(start_of_first_route, 'a href="', '"')
    # print("within school url with map")
    # print("http://maps.ntu.edu.sg" + first_route_url)
    first_route_response = requests.get("http://maps.ntu.edu.sg" + first_route_url)
    # limit it to the gothere.sg image
    first_route_gothere_img = crop_text(first_route_response.text, "gothere.sg", "width")
    # print("crop_text_output:")
    # print(first_route_gothere_img)
    p = re.compile("[0-9]{1,3}[.][0-9]{3,11}")
    _locations = p.findall(first_route_gothere_img)
    # print(_locations)
    # remove first location as it is duplicated with the second location
    locations.append(_locations[2::])
    # print("within school locations:")
    # print(locations)
    return locations


def find_first_route_url(url):
    result = response.text
    # Search for the first indication of route (id=d)
    p = re.compile('id=d ')

    # Todo: Add checks for cases of fail search

    match = p.search(result)

    if isinstance(match, type(None)):
        return "failed to find first route"

    match = match.span()[0]
    result = result[match::]  # remove anything before that..

    print(result)

    # Search for the first link of the route
    p = re.compile('"')
    match = p.search(result).span()[1]
    result = result[match::]
    print(result)
    p = re.compile('"')
    match = p.search(result).span()[0]
    result = result[0:match]
    print(result)
    return result


def get_paths(route_response):
    # print(route_response)
    # limit it to the gothere.sg image
    p = re.compile("img src=")
    match = p.search(route_response).span()[0]
    route_response = route_response[match:]
    p = re.compile("width")
    match = p.search(route_response).span()[0]
    route_response = route_response[:match]

    p = re.compile("[0-9]{1,3}[.][0-9]{3,11}")
    locations = p.findall(route_response)
    print(locations)
    # remove first location as it is duplicated with the second location
    locations = locations[2::]

    # paths = parse_locations(locations)
    paths = locations
    return paths


# def parse_locations(locations):
# 	# for each

def crop_text_backwards(string, start_regex, end_regex):
    while start_regex in string:
        past = string
        string = crop_text(string, start_regex)
    # print(past)
    return crop_text(past, start_regex, end_regex)


def crop_text(string, start_regex, end_regex=None, mode="forward"):
    # Todo: Add mode (crop internal or external) currently crop internal
    if mode == "forward":
        result = string
        p = re.compile(start_regex)
        match = p.search(result).span()[1]
        result = result[match:]

        if not isinstance(end_regex, type(None)):
            p = re.compile(end_regex)
            match = p.search(result).span()[0]
            result = result[:match]
    elif mode == "backwards":
        result = string
        p = re.compile(end_regex)
        match = p.search(result).span()[0]
        result = result[:match]
        # print(result)

        if not isinstance(start_regex, type(None)):
            p = re.compile(start_regex)
            match = p.search(result).span()[1]
            result = result[match:]

        # result = string
        # p = re.compile("(\\b" + end_regex + "\\b(?!.*\\b\1\\b))")
        # match = p.search(result).span()[0]
        # result = result[:match]
        # print(result)
        #
        # if not isinstance(start_regex, type(None)):
        #     p = re.compile("(\\b" + start_regex + "\\b(?!.*\\b\1\\b))")
        #     match = p.search(result).span()[1]
        #     result = result[match:]

    return result


if __name__ == "__main__":
    print("start")
    start = "pasir ris"
    end = "NEC"
    #get_listed_instructions("http://maps.ntu.edu.sg/m?q=S2&sch_btn=Go&font=+m&t=+Designated+Smoking+Area+2+-+Nanyang+Executive+Centre")
    # print("i return:")
    print(search(start, end, "b"))
