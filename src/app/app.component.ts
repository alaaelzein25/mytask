import { Component } from '@angular/core';
import  *  as  data  from  './partners.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'washmentask';
  partners:  any  = (data  as  any).default;

  
   starbucksLat:any = 51.5144636;
   starbucksLong:any = -0.142571;
  
   allPartnersCoordinates = []; 
   onePartnerCoordinate = [];
   allDistances = [];
   partnersInRange = [];
   arrayOfNames = [];
   sortedFinalArray = []; 
   distance = 0;
   range = 5000;  //a static number for the range that can be changed  
   index:number = 0;
  
  ngOnInit(){
    
	
	for (let entry of this.partners) {
		  this.allPartnersCoordinates.splice(this.index,0,entry.offices[0].coordinates);
		  this.index++;
		}
		//now we have an array called allPartnersCoordinates and in this array we have the coordinates of all the partners
		
		
		
		
		//now we have to iterate this array, and take each coordinate and calculate the distance with starbucks
		this.index = 0;
		for (let entry of this.allPartnersCoordinates) {
		  this.onePartnerCoordinate[this.index] = entry.split(",", 2);
		  this.distance = this.calcCrow(this.onePartnerCoordinate[this.index][0], this.onePartnerCoordinate[this.index][1], this.starbucksLat, this.starbucksLong);
		  this.allDistances.splice(this.index,0,this.distance);
		  this.index++;
		}
		
		
		this.index = 0;
		for(var i = 0; i < this.allDistances.length ; i++) {
			if( this.allDistances[i] < this.range) {  
			  this.partnersInRange.splice(this.index,0,this.partners[i]);
			  this.arrayOfNames.splice(this.index,0,this.partners[i].organization);
			  this.index++;
		  }
		}
		
		this.sortedFinalArray = this.sortElements(this.partnersInRange);
		
		
		console.log(this.sortedFinalArray);
		
		
  }
  
  
    toRad(Value)  {
        return Value * Math.PI / 180;
    }
	
	
	 calcCrow(lt1, lon1, lt2, lon2)  { 
      var R = 6371; // km
      var dLat = this.toRad(lt2-lt1); 	
      var dLon = this.toRad(lon2-lon1);
      var lat1 = this.toRad(lt1);
      var lat2 = this.toRad(lt2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }
	
	
	sortElements(arrayitems) {
		var sortedArray = arrayitems.sort((obj1, obj2) => {
		if (obj1.organization > obj2.organization) {
			return 1;
		}

		if (obj1.organization < obj2.organization) {
			return -1;
		}

		
	});
	
	return sortedArray;
	}
  
  
}



