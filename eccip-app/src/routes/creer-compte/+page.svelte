<script lang="ts">
    import {handleRegister, email, password, username, role} from './+page';    
</script>

   <!-- register/+page.svelte -->
<div class="register-form">
    <form on:submit={handleRegister}>
     <h2>Register</h2>
     <input bind:value={email} type="text" placeholder="Email" />
     <input bind:value={password} type="password" placeholder="Password" />
     <input bind:value={username} type="username" placeholder="Username"/>
     <input bind:group={role} type="radio" name="role" value="1">Poster
     <input bind:group={role} type="radio" name="role" value="0">Searcher
     <button type="submit">Register</button>
    </form>
   </div>