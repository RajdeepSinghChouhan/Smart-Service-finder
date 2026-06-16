package in.ashokit.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import in.ashokit.filter.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	 @Autowired
	 private DataSource dataSource;
	 
	 @Bean
	 public PasswordEncoder passwordEncoder() {
		 return new BCryptPasswordEncoder();
	 }
	 @Autowired
	 private JwtFilter jwtFilter;
	 
	 @Bean
	 public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception 
	 {
		 http.authorizeHttpRequests(auth -> auth
             .requestMatchers("/register","/login").permitAll()
             .anyRequest().authenticated())
		 	 .httpBasic(Customizer.withDefaults());
		 
		 http.csrf(CsrfConfigurer::disable);
		 http.cors(Customizer.withDefaults());
		 http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		 return http.build();
	 }
	 
	 @Bean 
	 public UserDetailsService userDetailsService()
	 {
		 JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
		 manager.setUsersByUsernameQuery(
			        "select username,password,1 as enabled from sbuser where username=?"//here i am hardcoding that user is enabled by writing 1 
			    );
		 manager.setAuthoritiesByUsernameQuery(
		    	    "select username,role as authority from sbuser where username=?"
		    	);
		 return manager;
	 }
	 
	 @Bean
	 public AuthenticationManager authenticationManager(HttpSecurity http)
	 {
		 AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);
		 builder.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
		 return builder.build();
	 }
}
