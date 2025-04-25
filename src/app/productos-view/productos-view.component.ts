import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/productos.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './productos-view.component.html',
  styleUrls: ['./productos-view.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    producto: '',
    codigobarras: 0,
    marca: '',
    costo: 0,
    estatus: 'A'
  };
  isEditMode = false;
  productId: number | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => this.product = product,
      error: (error) => {
        console.error('Error al cargar el producto:', error);
        alert('Error al cargar el producto');
      }
    });
  }

  saveProduct(): void {
    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, this.product).subscribe({
        next: () => {
          alert('Producto actualizado exitosamente');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
          alert('Error al actualizar el producto');
        }
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: () => {
          alert('Producto creado exitosamente');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al crear el producto:', error);
          alert('Error al crear el producto');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
