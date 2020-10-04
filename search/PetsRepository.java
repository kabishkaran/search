package com.kittyPet.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.kittyPet.models.Pets;

@Repository
public interface PetsRepository extends MongoRepository<Pets, Long> {
	
	 List<Pets> findByNameLike(String name);
	
	@Query(" {$or:[{'name' : {$regex: ?0, $options: 'i'}}, {'breed': {$regex: ?0, $options: 'i'}} ]}")
	List<Pets> searchPets(String search);

	Optional<Pets> findById(String id);


}
