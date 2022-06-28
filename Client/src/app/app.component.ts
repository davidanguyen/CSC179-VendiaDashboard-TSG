import { Component, OnInit, ViewChild } from '@angular/core';
import { createVendiaClient } from '@vendia/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Check for data on Vendia, also check for connection.
    console.log("" + client.deployments.get ? "Vendia Connection: Successful." : "Vendia ERR: Please check data.");
  }
}

export const client = createVendiaClient({
  apiUrl: `https://f6acv71r06.execute-api.us-west-1.amazonaws.com/graphql/`,
  websocketUrl: `wss://1xb4189lhh.execute-api.us-west-1.amazonaws.com/graphql`,
  apiKey: `H49jBvXsNFe6qvLGERozGqpCb8WzFouDcisZuK9ZQzF1`
});
