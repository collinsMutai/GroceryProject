import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true
})
export class ContactComponent implements OnInit {

  ngOnInit(): void {
    // Create the map and set its view to the chosen geographical coordinates and zoom level
    const map = L.map('map').setView([-1.265386, 36.805028], 16);

    // Add a tile layer to the map (OpenStreetMap in this case)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker to the map
    L.marker([-1.3313878, 36.8699253]).addTo(map)
      .bindPopup('Quickcart, Nairobi.')
      .openPopup();
  }
}
