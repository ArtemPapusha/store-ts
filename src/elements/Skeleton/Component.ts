import style from "./style.module.scss"

import {
  type SkeletonInterface
} from "./type"

class Skeleton implements SkeletonInterface {
  public $skeletonContainer: HTMLElement | null = null;
  
  
  public buildSkeletonProduct = (count: number): HTMLDivElement => {
    const $skeletonContainer = document.createElement('div');
    $skeletonContainer.className = [
      `d-flex`,
      `just-content-center`,
      `flex-direction-row`,
      `flex-wrap-wrap`,
    ].join(' ');
    
    for (let i = 0; i < count; i++) {
      const $cardWrapperSkeleton = document.createElement('div');
      $cardWrapperSkeleton.className = [
        style.cardWrapperSkeleton,
        'd-flex',
        'just-content-flex-start',
        'flex-direction-column',
        'align-items-center',
        'align-self-flex-start',
        'wd-20',
        'py-3',
        'px-3',
        'gap-10',
        'my-3',
        'mx-3',
      ].join(' ');
      
      $cardWrapperSkeleton.appendChild(this.buildSkeletonTitle());
      $cardWrapperSkeleton.appendChild(this.buildSkeletonImage());
  
      const $footerCardProductSkeleton = document.createElement('div');
      $footerCardProductSkeleton.className = [
        style.footerCardProductSkeleton,
        'd-flex',
        'just-content-space-between',
        'align-items-center',
        'gap-15',
      ].join(' ');
      
      const $priceSkeleton = document.createElement('div');
      $priceSkeleton.className = [
        style.priceSkeleton,
        style.skeleton,
      ].join(' ');
     
      $footerCardProductSkeleton.appendChild($priceSkeleton);
      $footerCardProductSkeleton.appendChild(this.buildSkeletonButton());
      $footerCardProductSkeleton.appendChild(this.buildSkeletonButton());
  
      $cardWrapperSkeleton.appendChild($footerCardProductSkeleton);
      $skeletonContainer.appendChild($cardWrapperSkeleton);
    }
  
    return $skeletonContainer;
  }

  protected buildSkeletonTitle = () => {
    const $titleSkeleton = document.createElement('div');

    $titleSkeleton.className = [
      style.titleSkeleton,
      'wd-100p',
    ].join(' ');
  
    for (let i = 0; i < 3; i++) {
      const $titleSkeletonElement = document.createElement('div');

      $titleSkeletonElement.className = [
        style.titleSkeletonElement,
        style.skeleton,
        'wd-100p',
      ].join(' ');
      
      $titleSkeleton.appendChild($titleSkeletonElement);
    }

    return $titleSkeleton;
  }
  
  protected buildSkeletonImage = () => {
    const $imageSkeleton = document.createElement('div');

    $imageSkeleton.className = [
      style.imageSkeleton,
      style.skeleton,
      'wd-100p',
    ].join(' ');

    return $imageSkeleton;
  }
  
  protected buildSkeletonButton = () => {
    const $buttonSkeleton = document.createElement('div');

    $buttonSkeleton.className = [
      style.buttonSkeleton,
      style.skeleton,
    ].join(' ');
    
    return $buttonSkeleton;
  }
  
  public buildSkeletonPagination = (): this =>{
    const $skeletonPagiantionWrapper = document.createElement('ul');
    $skeletonPagiantionWrapper.className = [
      style.paginationContainerSkelton,
      'd-flex',
      'just-content-center',
      'align-items-center',
      'gap-2',
    ].join(' ');
    
    for (let i = 0; i < 8; i++) {
      const $skeletonPagiantionElement = document.createElement('li');
      $skeletonPagiantionElement.className = [
        style.paginationSkeleton,
        style.skeleton,
      ].join(' ');
 
      $skeletonPagiantionWrapper.appendChild($skeletonPagiantionElement);
    }

    document.body.appendChild($skeletonPagiantionWrapper);

    return this;
  }
}
  
  export default Skeleton;