import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SOCIAL_LINKS } from '../social-links';

@Component({
  selector: 'app-links',
  imports: [NgOptimizedImage, MatListModule, FontAwesomeModule],
  templateUrl: './links.html',
  styleUrl: './links.scss',
})
export class Links {
  readonly socialLinks = SOCIAL_LINKS;

  readonly otherCosplayers = [
    {
      name: 'Puyoda',
      link: 'http://cosplay.silent-white.com/',
      image: 'links/puyoda.jpg',
    },
    {
      name: 'Hezachan',
      link: 'http://www.hezachan.com/',
      image: 'links/hezachan.jpg',
    },
  ];

  readonly textCosplayers = [
    { name: 'Maridah', link: 'https://www.maridah.com/' },
    { name: 'Vicious Cosplay', link: 'http://viciouscosplay.com/' },
    { name: 'Yayahan', link: 'http://yayahan.com' },
    { name: 'Kamui Cosplay', link: 'https://www.kamuicosplay.com/' },
  ];

  readonly cosplayStores = [
    { name: 'Epic Cosplay Wigs', link: 'https://www.epiccosplay.com/' },
    { name: 'Arda Wigs', link: 'https://www.arda-wigs.com/' },
    { name: 'Miccostumes', link: 'https://www.miccostumes.com/' },
    { name: 'Doki Doki Cosplay', link: 'https://dokidokicos.com/' },
    { name: 'Uwowo Cosplay', link: 'https://uwowocosplay.com/' },
    { name: 'Cosonsen Cosplay', link: 'https://www.cosonsen.com/' },
  ];

  readonly patternStores = [
    { name: 'Pattern Cos Patterns', link: 'https://www.etsy.com/shop/PatternCosPatterns' },
    { name: 'Dressmaking Amore', link: 'https://dressmakingamore.com/' },
    { name: 'Cosplay Printables', link: 'https://www.etsy.com/shop/Cosplayprintables' },
    {
      name: 'Sew Your Own Wardrobe',
      link: 'https://dk.com/en-us/blogs/resources/sew-your-own-wardrobe-downloadable-patterns',
    },
    { name: 'Dr Cos Patterns', link: 'https://dr-cos.info/' },
    { name: 'Alice in Cosplayland', link: 'https://aliceincosplayland.com/' },
  ];

  readonly banners = Array.from({ length: 13 }, (_, i) => `links/firecloak${i + 1}.jpg`);
}
