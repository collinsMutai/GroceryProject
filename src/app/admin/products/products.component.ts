import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [ProductCardComponent],
})
export class ProductsComponent implements OnInit {
  allProducts: any[] = [
    {
      category: 'vegetables',
      name: 'Red Onion',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71AM8cSg+7L.AC_SL240_.jpg',
    },
    {
      category: 'vegetables',
      name: 'Asparagus Green',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71rpY2GtFHL.AC_SL240_.jpg',
    },
    {
      category: 'vegetables',
      name: 'Zucchini Squash',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71GxrCR+gLL.AC_SL240_.jpg',
    },
    {
      category: 'vegetables',
      name: 'Plum Roma Tomato',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71xjZONKSIL.AC_SL240_.jpg',
    },
    {
      category: 'vegetables',
      name: 'Broccoli Crowns',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81JWj-cXxQL.AC_SL240_.jpg',
    },
    {
      category: 'vegetables',
      name: 'Green Bell Pepper',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToRhrzg0_RX2DNu3WIXvRp6jSP7LP7S18yyQ&s',
    },
    {
      category: 'vegetables',
      name: 'Carrots',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr3bM_dBaWJMdq4AIecvVNTp_K6wR3XVm6lw&s',
    },
    {
      category: 'vegetables',
      name: 'Cauliflower',
      imageUrl:
        'https://static.vecteezy.com/system/resources/previews/029/720/704/non_2x/cauliflower-transparent-background-png.png',
    },
    {
      category: 'vegetables',
      name: 'Spinach',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9J874t5hj-JnGP5IT1Jd89msWpHKb0bL5Vg&s',
    },
    {
      category: 'vegetables',
      name: 'Kale',
      imageUrl:
        'https://purepng.com/public/uploads/large/purepng.com-kale-bundlevegetables-kale-leaf-cabbage-green-leaves-borecole-941524683046rvwcj.png',
    },
    {
      category: 'vegetables',
      name: 'Cabbage',
      imageUrl: 'https://pngimg.com/d/cabbage_PNG8804.png',
    },
    {
      category: 'vegetables',
      name: 'Lettuce',
      imageUrl:
        'https://i.pinimg.com/originals/60/16/91/6016911336b4930bb9eda15b99ffad36.png',
    },
    {
      category: 'vegetables',
      name: 'Sweet Potatoes',
      imageUrl:
        'https://static.vecteezy.com/system/resources/previews/029/712/252/original/sweet-potato-transparent-background-png.png',
    },
    {
      category: 'vegetables',
      name: 'Celery',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTfGGxcJ79G0PvHdw1m7L9ucXSNMX6_HZqXw&s',
    },
    {
      category: 'vegetables',
      name: 'Cucumbers',
      imageUrl:
        'https://www.pngall.com/wp-content/uploads/2016/04/Cucumber-PNG-HD.png',
    },
    {
      category: 'vegetables',
      name: 'Eggplant',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HUPGE0lD14wLE0Gv-FFFG3R8o-g_6_Z1KA&s',
    },
    {
      category: 'vegetables',
      name: 'Radish',
      imageUrl:
        'https://purepng.com/public/uploads/large/purepng.com-radishvegetables-radish-fodder-radish-941524712345m1qre.png',
    },
    {
      category: 'vegetables',
      name: 'Beets',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRs_hWteGqH5RSUI0TjcRMgNP64QpEKvUxWA&s',
    },
    {
      category: 'vegetables',
      name: 'Pumpkin',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlb8dTjBW78N3SXb1X_P76KamYKPKyBxPI1A&s',
    },
    {
      category: 'vegetables',
      name: 'Butternut Squash',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpF_XoBsOL4NL5Df-Y-Q_ovNo7aebBAVMYSA&s',
    },
    {
      category: 'vegetables',
      name: 'Tomatoes',
      imageUrl:
        'https://www.transparentpng.com/download/tomato/PSJAVT-tomato-picture.png',
    },
    {
      category: 'vegetables',
      name: 'Green Beans',
      imageUrl:
        'https://images.everydayhealth.com/images/diet-nutrition/potential-health-benefits-of-green-beans-1440x810.jpg',
    },
    {
      category: 'vegetables',
      name: 'Brussels Sprouts',
      imageUrl:
        'https://purepng.com/public/uploads/large/purepng.com-brussels-sproutsvegetables-brussels-sprouts-941524719390ewwex.png',
    },
    {
      category: 'vegetables',
      name: 'Artichoke',
      imageUrl:
        'https://www.thespruceeats.com/thmb/Z9vy2vlSdm2c-g7vlnm2_MPAEec=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-157315654-2b78b5edd25e414ebfa0301aa676018e.jpg',
    },
    {
      category: 'fruits',
      name: 'Lime',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81HZUsK9dRL.AC_SL240_.jpg',
      unitPrice: 588.0,
      unitPriceKg: 1176.0,
      description: 'FRESH Lime',
      inStock: true,
    },
    {
      category: 'fruits',
      name: 'Organic Strawberries',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81knc9-4RHL.AC_SL240_.jpg',
    },
    {
      category: 'fruits',
      name: 'Honeycrisp Apple',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71PxRvQMaoL.AC_SL240_.jpg',
    },
    {
      category: 'fruits',
      name: 'Navel Orange',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71ohLOFjl0L.AC_SL240_.jpg',
    },
    {
      category: 'fruits',
      name: 'Mini Seedless Watermelon',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/818aDbVU3xL.AC_SL240_.jpg',
    },
    {
      category: 'fruits',
      name: 'Asparagus Green',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71rpY2GtFHL.AC_SL240_.jpg',
    },
    {
      category: 'fruits',
      name: 'Medium Hass Avocado',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81LKLCmdAQL.AC_SL240_.jpg',
    },
    {
      category: 'fruits',
      name: 'Banana',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSP7gbmcXF7ZV88S4eU-1LepaJ4rTQmsZ1kw&s',
    },
    {
      category: 'fruits',
      name: 'Grapes',
      imageUrl:
        'https://thumbs.dreamstime.com/b/bunch-grapes-isolated-white-background-112957297.jpg',
    },
    {
      category: 'spices',
      name: 'Cinnamon',
      imageUrl:
        'https://www.pngkit.com/png/full/171-1719694_cinnamon-powder-png.png',
    },
    {
      category: 'spices',
      name: 'Black Pepper',
      imageUrl:
        'https://www.pngkit.com/png/full/150-1509307_black-pepper-png-black-pepper-powder-png.png',
    },
    {
      category: 'spices',
      name: 'Turmeric',
      imageUrl:
        'https://www.pngkit.com/png/full/66-667747_turmeric-powder-png-turmeric-powder-png.png',
    },
    {
      category: 'spices',
      name: 'Paprika',
      imageUrl:
        'https://www.pngkit.com/png/full/60-606013_paprika-powder-png.png',
    },
    {
      category: 'meats',
      name: 'Chicken Breast',
      imageUrl:
        'https://www.pngall.com/wp-content/uploads/2016/05/Chicken-Breast-PNG-Pic.png',
    },
    {
      category: 'meats',
      name: 'Ground Beef',
      imageUrl:
        'https://www.pngkit.com/png/full/193-1934286_ground-beef-png-ground-beef.png',
    },
    {
      category: 'meats',
      name: 'Pork Chops',
      imageUrl:
        'https://www.pngkit.com/png/full/80-805046_pork-chops-pork-chops-png.png',
    },
    {
      category: 'meats',
      name: 'Salmon Fillet',
      imageUrl:
        'https://www.pngall.com/wp-content/uploads/2016/05/Salmon-PNG-Clipart.png',
    },
    {
      category: 'dairies',
      name: 'Cheddar Cheese',
      imageUrl:
        'https://www.pngkit.com/png/full/116-1163502_cheddar-cheese-png.png',
    },
    {
      category: 'dairies',
      name: 'Milk',
      imageUrl:
        'https://www.pngkit.com/png/full/6-63138_milk-png-transparent-background.png',
    },
    {
      category: 'dairies',
      name: 'Greek Yogurt',
      imageUrl:
        'https://www.pngkit.com/png/full/286-2867568_greek-yogurt-png-transparent.png',
    },
    {
      category: 'dairies',
      name: 'Butter',
      imageUrl: 'https://www.pngkit.com/png/full/108-1082254_butter-png.png',
    },
  ];
  products: any[] = []
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res;
      console.log(this.products);
    });
  }

  addProductForm() {
    this.router.navigate(['dashboard/add-product']);
  }

  navigateTo(category: string) {
    this.router.navigate([`/${category}`]);
  }
}
