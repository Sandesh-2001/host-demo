import { Component, ViewChild } from '@angular/core';
import {
  GoogleMap,
  GoogleMapsModule,
  MapRectangle,
} from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  map1: google.maps.Map | undefined;
  geocoder: google.maps.Geocoder | undefined;
  center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };
  zoom = 12;

  drawingManager!: google.maps.drawing.DrawingManager;

  async ngOnInit() {
    await this.loadGoogleMapsAPI();

    console.log('google object', (window as any).google);
    if (typeof google !== 'undefined' && google.maps) {
      this.initializeDrawingManager();
    } else {
      console.error('Google Maps API not loaded.');
    }
  }

  private loadGoogleMapsAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (google.maps !== undefined && google.maps) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  initializeMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      // Initialize the map
      this.map1 = new google.maps.Map(mapElement, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 10,
      });

      // Initialize the Geocoder
      this.geocoder = new google.maps.Geocoder();
      google;
      // Example Lat/Lng
      const lat = 37.7749;
      const lng = -122.4194;

      // Get location data
      this.getLocationData(lat, lng);
    }
  }

  public initializeDrawingManager() {
    this.drawingManager = new google.maps.drawing!.DrawingManager({
      drawingMode: null,
      drawingControl: true,
      rectangleOptions: {
        fillColor: 'red',
        fillOpacity: 0.2,
        strokeColor: 'black',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        editable: true,
        draggable: false,
      },
    });
  }

  enableDrawing() {
    if (this.drawingManager && this.map.googleMap) {
      this.drawingManager.setMap(this.map.googleMap);
      // this.drawingManager.setDrawingMode(
      //   google.maps.drawing.OverlayType.CIRCLE
      // );

      google.maps.event.addListener(
        this.drawingManager,
        'overlaycomplete',
        (event: google.maps.drawing.OverlayCompleteEvent) => {
          if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
            const rectangle = event.overlay as google.maps.Circle;
            console.log(rectangle);
            const bounds = rectangle.getCenter();
            console.log('Rectangle Bounds:', bounds?.toJSON());
            this.getLocationData(37.7749, 122.4194);

            this.drawingManager.setDrawingMode(null);
          } else if (event.type === google.maps.drawing.OverlayType.RECTANGLE) {
            const rectangle = event.overlay as google.maps.Rectangle;
            console.log(rectangle);
            const bounds = rectangle.getBounds();
            console.log('rectangle', bounds);
            // console.log('Rectangle Bounds:', bounds?.toJSON());
            this.getLocationData(37.7749, 122.4194);

            this.drawingManager.setDrawingMode(null);
          }
        }
      );
    } else {
      console.error('DrawingManager or Map is not initialized.');
    }
  }

  getLocationData(lat: number, lng: number) {
    if (this.geocoder) {
      console.log('hii');
      const latlng = { lat, lng };
      this.geocoder.geocode({ location: latlng }, (results: any, status) => {
        console.log('result', results);
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            console.log('Formatted Address:', results[0].formatted_address);
            console.log('Place Details:', results);
          } else {
            console.error('No results found');
          }
        } else {
          console.error('Geocoder failed due to:', status);
        }
      });
    }
  }
}
