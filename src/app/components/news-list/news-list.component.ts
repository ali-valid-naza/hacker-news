import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { News } from "../../types";
import { GetNewsListService } from "../../services/get-news-list/get-news-list.service";
import { LoadingService } from "../../services/utility/loading-service/loading.service";
import { TransitDataService } from "../../services/utility/transit-data-service/transit-data.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import {
  FRONT_PAGE_URL_PER_PAGE_0, SEARCH_PER_AGE_0,
  TAGS_FRONT_PAGE, TAGS_QUERY, TAGS_STORY,
  URL_HITS_PER_PAGE,
} from "../../app.constants";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit, AfterViewInit {
  $loading = this.loader.$loading;
  mapNewsObjectIdNewsText: any = new Map();

  frontPageUrlPerPage0 = FRONT_PAGE_URL_PER_PAGE_0;
  urlHitsPerPage = URL_HITS_PER_PAGE;
  tagsFrontPage = TAGS_FRONT_PAGE;
  urlStoryTags = TAGS_STORY;
  displayedColumns: string[] = [
    'title', 'points', 'author',
    'url', 'num_comments', 'created_at',
  ];
  previousUrl: string = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

  searchUrlPerPage0 = SEARCH_PER_AGE_0;

  tagQuery = TAGS_QUERY;

  dataSource = new MatTableDataSource<News>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private getNewsListService: GetNewsListService,
    private loader: LoadingService,
    private transitDataService: TransitDataService,
  ) {
  }

  ngOnInit(): void {
    this.devMethodFrontNews(this.dataSource);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // fetchActualData(frontPageUrlPerPage0: string) {
  //   this.getNewsListService.getParametersFrontPage(frontPageUrlPerPage0)
  //     .subscribe(v => {
        // this.getNewsListService
        //   .getAllFrontNews(this.urlHitsPerPage, v.nbHits, this.tagsFrontPage)
        //   .subscribe(v => {
        //     this.dataSource.data = v.hits;
        //     this.dataSource.paginator = this.paginator;
        //
        //     this.transitData(this.dataSource.data);
        //   });
  //     });
  // }

  // fetchPreviousData() {
  //   this.getNewsListService.getParametersFrontPage(this.previousUrl)
  //     .subscribe(v => {
  //       this.getNewsListService
  //         .getAllFrontNews(this.urlHitsPerPage, v.nbHits, this.urlStoryTags)
  //         .subscribe(v => {
  //           this.dataSource.data =
  //             v.hits
  //               .filter((v) => !v._tags.includes('front_page'))
  //               .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  //           this.dataSource.paginator = this.paginator;
  //
  //           this.transitData(this.dataSource.data);
  //         });
  //     });
  // }


  // devGetSearchQuery(searchQuery: string) {
  //   this.getNewsListService
  //     .getParametersFrontPage(`${this.searchUrlPerPage0}${searchQuery}`)
  //     .subscribe((v) => {
  //       this.getNewsListService
  //         .getNewsBySearchQuery(this.urlHitsPerPage,
  //           v.nbHits, this.tagQuery, searchQuery).subscribe(v => {
  //         this.dataSource.data =
  //           v.hits
  //             .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  //         this.dataSource.paginator = this.paginator;
  //
  //         this.transitData(this.dataSource.data);
  //       });
  //     });
  // }

  // transitData(v: News[]) {
  //   v.forEach(v => this.mapNewsObjectIdNewsText.set(v.objectID, v.story_text));
  //   this.transitDataService.emitData(this.mapNewsObjectIdNewsText);
  // }

  devMethodFrontNews(dataSource: MatTableDataSource<News>) {
    this.getNewsListService.devFetchFrontNews(dataSource)
  }
  devMethodPreviousNews(dataSource: MatTableDataSource<News>) {
    this.getNewsListService.devFetchPreviousData(dataSource)
  }

  devMethodSearchQuery(searchQuery: string, dataSource: MatTableDataSource<News>) {

  }
}
