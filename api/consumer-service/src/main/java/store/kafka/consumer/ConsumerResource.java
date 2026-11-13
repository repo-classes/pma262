package store.kafka.consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class ConsumerResource {

    @Autowired
    private ConsumerService consumerService;

    
}
