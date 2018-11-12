import googlemaps
from datetime import datetime

gmaps = googlemaps.Client(key="AIzaSyAWobQQSUfzzBNhMCALwc3txe1US7F_QQo")

# Geocoding an address
geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')

# Look up an address with reverse geocoding
reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

# Request directions via public transit
now = datetime.now()
directions_result = gmaps.directions("pioneer mrt",
                                     "1.35185801919, 103.688358438",
                                     mode="transit",
                                     departure_time=now)
print(directions_result)