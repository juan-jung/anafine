package com.ssafy.backend.service;

import com.ssafy.backend.dto.SearchRecommendDto;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.ExceptionEnum;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ESQueryService {

    private final RestHighLevelClient client;

    public List<SearchRecommendDto> recommend(String keyword) {
        BoolQueryBuilder bqb = QueryBuilders.boolQuery();
        bqb.should(QueryBuilders.termQuery("path",keyword));
        bqb.should(QueryBuilders.termQuery("path.partial",keyword));
        bqb.should(QueryBuilders.termQuery("engtokor.partial",keyword));
        bqb.should(QueryBuilders.termQuery("chosung.partial",keyword));

        SearchSourceBuilder ssb = new SearchSourceBuilder()
                .query(bqb).size(10);
        ArrayList<SearchRecommendDto> treatments = new ArrayList<>();
        try {
            SearchHits hits = client.search(new SearchRequest("treatment").source(ssb), RequestOptions.DEFAULT).getHits();
            for(SearchHit hit : hits) {
                Map<String, Object> map = hit.getSourceAsMap();
                map.get("treatmentId");
                SearchRecommendDto treatment = SearchRecommendDto.builder()
                        .treatmentId((String) map.get("treatmentId"))
                        .name((String) map.get("name"))
                        .path((String) map.get("path"))
                        .build();
                treatments.add(treatment);
            }
            return treatments;
        } catch (IOException e) {
            throw new CustomException(ExceptionEnum.ElasticSearchIOException);
        }
    }
}
